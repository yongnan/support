#  Route53

## list vpc

```bash
% aws route53 list-hosted-zones --profile featuredev
{
    "HostedZones": [
        {
            "Id": "/hostedzone/Z071804422I69NMV5CSGV",
            "Name": "yncdev.link.",
            "CallerReference": "RISWorkflow-RD:4174c6a1-f1d5-4f00-830b-60ba429428cf",
            "Config": {
                "Comment": "HostedZone created by Route53 Registrar",
                "PrivateZone": false
            },
            "ResourceRecordSetCount": 5
        }
    ]
}

```



**Note:** Replace **VPC_ID** with your relevant value.

```bash
 % aws route53 get-hosted-zone --id Z071804422I69NMV5CSGV
{
    "HostedZone": {
        "Id": "/hostedzone/Z071804422I69NMV5CSGV",
        "Name": "yncdev.link.",
        "CallerReference": "RISWorkflow-RD:4174c6a1-f1d5-4f00-830b-60ba429428cf",
        "Config": {
            "Comment": "HostedZone created by Route53 Registrar",
            "PrivateZone": false
        },
        "ResourceRecordSetCount": 5
    },
    "DelegationSet": {
        "NameServers": [
            "ns-1114.awsdns-11.org",
            "ns-2002.awsdns-58.co.uk",
            "ns-456.awsdns-57.com",
            "ns-985.awsdns-59.net"
        ]
    }
}
```

