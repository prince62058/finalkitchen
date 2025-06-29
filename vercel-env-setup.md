# Vercel में Environment Variables Setup करने का Guide

## Step 1: Environment Variables Section खोलें

आपके Vercel project setup page में:
1. **"Environment Variables"** section देखें (नीचे की तरफ)
2. अगर collapsed है तो expand करें

## Step 2: NODE_ENV Add करें

1. **"Add More"** button पर click करें (+ Add More)
2. नया environment variable add करें:
   - **Key**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: All (या Production select करें)

## Step 3: Database URL Complete करें

आपका current DATABASE_URL incomplete है। Complete URL format:

```
postgresql://neondb_owner:PASSWORD@ep-wild-water-a5s6ygd0.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Complete URL पाने के लिए:
1. **Neon Dashboard** पर जाएं: https://console.neon.tech
2. आपका project select करें
3. **"Connection Details"** या **"Connection String"** section में जाएं
4. **Complete connection string** copy करें (password के साथ)

### Vercel में Update करें:
1. Current DATABASE_URL के सामने **"Edit"** button पर click करें
2. Complete connection string paste करें
3. **"Save"** पर click करें

## Step 4: Final Check

Environment Variables section में होना चाहिए:
- ✅ `DATABASE_URL` = `postgresql://neondb_owner:FULL_PASSWORD@ep-wild-water-a5s6ygd0.us-east-2.aws.neon.tech/neondb?sslmode=require`
- ✅ `NODE_ENV` = `production`

## Step 5: Deploy करें

सब variables set होने के बाद:
1. **"Deploy"** button पर click करें
2. Deployment process start होगी

---

## अगर Neon Password नहीं मिल रहा:

1. **Neon Console** में login करें
2. **Settings** → **Connection Details** में जाएं
3. **"Reset Password"** option use करें
4. नया password generate करें
5. Complete connection string copy करें

यह process complete करने के बाद आपका deployment successful हो जाएगी।