#ifndef CUSTOMREQUESTINTERCEPTOR_H
#define CUSTOMREQUESTINTERCEPTOR_H

#include <QWebEngineUrlRequestInterceptor>
#include <QWebEngineUrlRequestInfo>
#include <QDateTime>
#include <QHash>

class CustomRequestInterceptor : public QWebEngineUrlRequestInterceptor
{
    Q_OBJECT

public:
    explicit CustomRequestInterceptor(QObject *parent = nullptr);
    void interceptRequest(QWebEngineUrlRequestInfo &info) override;

private:
    QHash<QString, QDateTime> m_requestTracker;
};

#endif // CUSTOMREQUESTINTERCEPTOR_H
