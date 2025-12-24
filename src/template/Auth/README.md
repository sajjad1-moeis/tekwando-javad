# Auth Template - راهنمای استفاده

## ساختار فایل‌ها

```
src/template/Auth/
├── BackgroundIllustration.js    # بک‌گراند صفحات احراز هویت
├── SectionContainer.js          # Container برای محتوای فرم
├── LabeledField.js              # فیلد با label
├── Logo.js                      # لوگوی IRI.F
├── OtpInput.js                  # ورودی کد OTP
├── LoginView.js                 # View صفحه ورود
├── RegisterView.js              # View صفحه ثبت نام
├── PasswordRecoveryView.js      # View بازیابی رمز عبور
├── MobileVerificationView.js    # View تایید شماره موبایل
└── CreatePasswordView.js        # View ساخت رمز عبور جدید
```

## اضافه کردن تصاویر بک‌گراند

برای اضافه کردن تصاویر بک‌گراند:

1. تصاویر را در فولدر `public/images/auth/` قرار دهید:
   - `login-bg.jpg` - تصویر بک‌گراند صفحه ورود
   - `register-bg.jpg` - تصویر بک‌گراند صفحه ثبت نام

2. یا می‌توانید مسیر تصاویر را در فایل `BackgroundIllustration.js` تغییر دهید:

```javascript
const backgroundImage = variant === "login" 
  ? "/images/auth/login-bg.jpg"  // مسیر تصویر لاگین
  : "/images/auth/register-bg.jpg"; // مسیر تصویر ثبت نام
```

## ویژگی‌ها

- ✅ بک‌گراند جداگانه برای login و register
- ✅ لوگو در بالای فرم‌ها
- ✅ استفاده از کامپوننت‌های shadcn/ui
- ✅ طراحی responsive
- ✅ پشتیبانی از RTL

## استفاده

```jsx
// در صفحات app/auth/login/page.jsx
<AuthLayout variant="login">
  <LoginView />
</AuthLayout>

// در صفحات app/auth/register/page.jsx
<AuthLayout variant="register">
  <RegisterView />
</AuthLayout>
```

