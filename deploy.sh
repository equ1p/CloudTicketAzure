#!/bin/bash

# Target region: Poland Central
LOCATION="polandcentral"
RESOURCE_GROUP="rg-cloudticket-$LOCATION"

echo "======================================================="
echo "    STARTING CLOUDTICKET INFRASTRUCTURE DEPLOYMENT     "
echo "    Region: $LOCATION                                  "
echo "======================================================="
echo ""

# 1. Basic configuration
SUFFIX=$RANDOM
SQL_SERVER="sqlserver-ticket-$SUFFIX"
SQL_DB="sqldb-cloudticket"
SQL_ADMIN="" # FILL IN: Database admin username
SQL_PASS=""  # FILL IN: Database admin password

STORAGE_ACCT="stticket$SUFFIX"
APP_PLAN="asp-ticket-$SUFFIX"
WEB_APP="app-api-ticket-$SUFFIX"
SERVICE_BUS="sb-ticket-$SUFFIX"
FUNC_APP="func-worker-ticket-$SUFFIX"

# 2. Create Resource Group
echo "[+] Creating Resource Group ($RESOURCE_GROUP)..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# 3. Create Storage Account and Table
echo "[+] Creating Storage Account ($STORAGE_ACCT)..."
az storage account create --name $STORAGE_ACCT --resource-group $RESOURCE_GROUP --location $LOCATION --sku Standard_LRS
az storage table create --name IdempotencyKeys --account-name $STORAGE_ACCT --auth-mode login

# 4. Create SQL Server and Database
echo "[+] Creating SQL Server ($SQL_SERVER)..."
az sql server create --name $SQL_SERVER --resource-group $RESOURCE_GROUP --location $LOCATION --admin-user "$SQL_ADMIN" --admin-password "$SQL_PASS"

echo "[+] Creating SQL Database ($SQL_DB)..."
az sql db create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name $SQL_DB --edition Basic --capacity 5

echo "[+] Applying Firewall Rules for Azure Services..."
az sql server firewall-rule create --resource-group $RESOURCE_GROUP --server $SQL_SERVER --name AllowAzureIps --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

# 5. Create Service Bus and Queue
echo "[+] Creating Service Bus ($SERVICE_BUS)..."
az servicebus namespace create --resource-group $RESOURCE_GROUP --name $SERVICE_BUS --location $LOCATION --sku Basic
az servicebus queue create --resource-group $RESOURCE_GROUP --namespace-name $SERVICE_BUS --name email-queue

# 6. Create App Service Plan (The "Server" for both Web App and Function)
echo "[+] Creating App Service Plan ($APP_PLAN)..."
az appservice plan create --name $APP_PLAN --resource-group $RESOURCE_GROUP --location $LOCATION --sku B1 --is-linux

# 7. Create Web App (API)
echo "[+] Creating Web App API ($WEB_APP)..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_PLAN --name $WEB_APP --runtime "DOTNETCORE|10.0"

# 8. Create Azure Function (Attached to the SAME App Service Plan)
echo "[+] Creating Azure Function ($FUNC_APP)..."
az functionapp create --resource-group $RESOURCE_GROUP --plan $APP_PLAN --runtime dotnet-isolated --runtime-version 10 --functions-version 4 --name $FUNC_APP --storage-account $STORAGE_ACCT

echo ""
echo "======================================================="
echo "    [SUCCESS] All services successfully created!       "
echo "======================================================="