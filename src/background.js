const AADTenantIds = [
    "[AAD_TENANT_ID]"
];

const AADContextId = "[AAD_TENANT_ID]";

function setTRV1Headers(e)
{
    var AADTenantIdsHeaderValue = AADTenantIds.join(",");

    var tenantPos = e.requestHeaders.map(function(h) {return h.name.toLowerCase(); }).indexOf("restrict-access-to-tenants");
    var contextPos = e.requestHeaders.map(function(h) {return h.name.toLowerCase(); }).indexOf("restrict-access-context");

    // Check if the header already exists and override or add a new header
    if(tenantPos === -1)
    {
        e.requestHeaders.push({ name: "Restrict-Access-To-Tenants", value: AADTenantIdsHeaderValue });
    }
    else
    {
        e.requestHeaders[tenantPos] = AADTenantIdsHeaderValue;
    }

    // Check if the header already exists and override or add a new header
    if(contextPos === -1)
    {
        e.requestHeaders.push({ name: "Restrict-Access-Context", value: AADContextId });
    }
    else
    {
        e.requestHeaders[contextPos] = AADContextId;
    }

    return {requestHeaders: e.requestHeaders};
}

function verifyTRV1Headers(e)
{
    var tenantPos = e.requestHeaders.map(function(h) {return h.name.toLowerCase(); }).indexOf("restrict-access-to-tenants");
    var contextPos = e.requestHeaders.map(function(h) {return h.name.toLowerCase(); }).indexOf("restrict-access-context");

    if(tenantPos === -1)
    {
        console.log("Restrict-Access-To-Tenants missing!");
    }

    if(contextPos === -1)
    {
        console.log("Restrict-Access-Context missing!");
    }
}

chrome.webRequest.onBeforeSendHeaders.removeListener(setTRV1Headers);
chrome.webRequest.onBeforeSendHeaders.addListener(
    setTRV1Headers, 
    {
        urls: [
            'https://login.microsoftonline.com/*',
            'https://login.microsoft.com/*',
            'https://login.windows.net/*'
        ]
    },
    [
        'blocking', 
        'requestHeaders', 
        "extraHeaders"
    ]
);

chrome.webRequest.onSendHeaders.removeListener(verifyTRV1Headers);
chrome.webRequest.onSendHeaders.addListener(
    verifyTRV1Headers, {
        urls: [            
            'https://login.microsoftonline.com/*',
            'https://login.microsoft.com/*',
            'https://login.windows.net/*'
        ]
    },
    [
        'requestHeaders', 
        "extraHeaders"
    ]
);