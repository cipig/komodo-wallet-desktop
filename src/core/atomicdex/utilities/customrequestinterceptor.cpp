#include "customrequestinterceptor.h"
#include <QDebug>

CustomRequestInterceptor::CustomRequestInterceptor(QObject *parent)
    : QWebEngineUrlRequestInterceptor(parent)
{
}

void CustomRequestInterceptor::interceptRequest(QWebEngineUrlRequestInfo &info)
{
    QUrl url = info.requestUrl();
    QString host = url.host();

    if (host.contains("coinpaprika.com"))
    {
        // Combine host and path (e.g., "graphsv2.coinpaprika.com/currency/data/nmc-namecoin/30d/")
        // We omit the query parameters (?quote=USD...) so it creates a reliable cache key identifier
        QString uniqueResourceKey = host + url.path();
        
        QDateTime currentTime = QDateTime::currentDateTime();
        const int TARGET_TIMEOUT_SECONDS = 3;

        if (m_requestTracker.contains(uniqueResourceKey)) {
            QDateTime lastRequested = m_requestTracker.value(uniqueResourceKey);
            int secondsPassed = lastRequested.secsTo(currentTime);

            // 2. If the request is retried within 3 seconds, the network is stalling.
            // Force Chromium to serve the stale local database item immediately.
            if (secondsPassed < TARGET_TIMEOUT_SECONDS) {
                qDebug() << "[Interceptor] Timeout hit (" << secondsPassed << "s). Forcing cache fallback for:" << uniqueResourceKey;
                
                // Instructs Chromium to bypass the network entirely for this cycle
                info.setHttpHeader("Cache-Control", "max-stale=31536000, only-if-cached");
                return;
            }
        }

        // 3. First-attempt tracking phase: Track time, allow the normal network call to complete
        // and let Chromium save the fresh network assets into its disk engine partition.
        m_requestTracker.insert(uniqueResourceKey, currentTime);
        
        // Optimizes background validation rules
        info.setHttpHeader("Cache-Control", "stale-while-revalidate=15");
    }
}
