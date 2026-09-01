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
        // Skip preflight check calls completely
        if (info.requestMethod() == "OPTIONS") {
            return;
        }

        QString uniqueResourceKey = host + url.path();
        QDateTime currentTime = QDateTime::currentDateTime();
        const int TARGET_TIMEOUT_SECONDS = 3;

        if (m_requestTracker.contains(uniqueResourceKey)) {
            QDateTime lastRequested = m_requestTracker.value(uniqueResourceKey);
            int secondsPassed = lastRequested.secsTo(currentTime);

            if (secondsPassed < TARGET_TIMEOUT_SECONDS) {
                qDebug() << "[Interceptor] Timeout hit (" << secondsPassed << "s). Forcing Qt 5.15 Cache fallback for:" << uniqueResourceKey;
                info.setHttpHeader("Cache-Control", "max-stale=31536000, only-if-cached");
                return;
            }
        }

        m_requestTracker.insert(uniqueResourceKey, currentTime);
    }
}
