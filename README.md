## Front end

Para iniciar la visualizacion del frontend debemos de usar:
```
cd Frontend-Project-Structure
npm install
npm start
```
Ahora los archivos que necesitan conexion por parte del backend son:
```
src
├── App.css
├── * App.jsx 
├── assets
│   ├── images
│   │   ├── carousel
│   │   │   ├── slide_1.jpg
│   │   │   ├── slide_2.jpg
│   │   │   └── slide_3.jpg
│   │   ├── logoMediAid.jpeg
│   │   └── med-placeholder.png
│   └── svg
│       ├── escudoESCOM.svg
│       └── logotipo_ipn.svg
├── components
│   ├── layout
│   │   ├── Footer
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── MainLayout
│   │   │   ├── MainLayout.css
│   │   │   └── MainLayout.jsx
│   │   └── NavBar
│   │       ├── NavBar.css
│   │       └── * NavBar.jsx  // (Para obtener datos del usuario logueado o estado de notificaciones)
│   └── ui
│       ├── backbutton
│       │   ├── BackButton.css
│       │   ├── BackButton.jsx
│       │   └── BackButton.stories.jsx
│       ├── button
│       │   ├── Button.css
│       │   ├── Button.jsx
│       │   └── button.stories.jsx
│       ├── infoCard
│       │   ├── InfoCard.css
│       │   └── InfoCard.jsx
│       ├── InfoModal
│       │   ├── InfoModal.css
│       │   └── InfoModal.jsx
│       ├── input
│       │   ├── Input.css
│       │   ├── Input.jsx
│       │   └── input.stories.jsx
│       ├── MedicationCard
│       │   ├── MedicationCard.css
│       │   ├── MedicationCard.jsx
│       │   └── MedicationCard.stories.jsx
│       ├── Modal
│       │   ├── Modal.css
│       │   └── Modal.jsx
│       ├── Pagination
│       │   ├── Pagination.css
│       │   └── Pagination.jsx
│       ├── StatusIcon
│       │   ├── StatusIcon.css
│       │   └── StatusIcon.jsx
│       └── TabToggle
│           ├── TabToggle.css
│           └── TabToggle.jsx
├── features
│   ├── auth
│   │   ├── LoginForm.css
│   │   └── * LoginForm.jsx
│   ├── catalog
│   │   ├── MedicationDetailModal
│   │   │   ├── MedicationDetailModal.css
│   │   │   └── * MedicationDetailModal.jsx // (Podría necesitar cargar más detalles)
│   │   ├── MedicationGrid
│   │   │   ├── MedicationGrid.css
│   │   │   └── * MedicationGrid.jsx // (Carga la lista principal)
│   │   ├── MedicationToolbar
│   │   │   ├── MedicationToolbar.css
│   │   │   └── MedicationToolbar.jsx // (Dispara la lógica, pero la carga la hace el Grid/Page)
│   │   └── ScarcityBanner
│   │       ├── ScarcityBanner.css
│   │       └── * ScarcityBanner.jsx
│   ├── donation
│   │   ├── DonationForm
│   │   │   ├── DonationForm.css
│   │   │   └── * DonationForm.jsx
│   │   └── DonationStatusTable
│   │       ├── DonationStatusTable.css
│   │       └── DonationStatusTable.jsx // (Recibe datos, no los pide directamente)
│   ├── ForgotPasswordForm
│   │   ├── ForgotPasswordForm.css
│   │   └── * ForgotPasswordForm.jsx
│   ├── home
│   │   ├── HomeGrid
│   │   │   ├── HomeGrid.css
│   │   │   └── * HomeGrid.jsx // (Si los datos de las cards se vuelven dinámicos)
│   │   ├── ImageCarousel
│   │   │   ├── ImageCarousel.css
│   │   │   └── * ImageCarousel.jsx // (Si las imágenes se vuelven dinámicas)
│   │   └── QuickLinks
│   │       ├── QuickLinks.css
│   │       └── QuickLinks.jsx
│   ├── notifications
│   │   └── NotificationPanel
│   │       ├── NotificationPanel.css
│   │       └── * NotificationPanel.jsx
│   ├── profile
│   │   ├── EditProfileForm
│   │   │   ├── EditProfileForm.css
│   │   │   └── * EditProfileForm.jsx
│   │   ├── UserContactInfo
│   │   │   ├── UserContactInfo.css
│   │   │   └── UserContactInfo.jsx
│   │   ├── UserdDonationHistory
│   │   │   ├── UserDonationHistory.css
│   │   │   └── UserDonationHistory.jsx // (Recibe datos)
│   │   ├── UserDonationStats
│   │   │   ├── UserDonationStats.css
│   │   │   └── UserDonationStats.jsx // (Recibe datos)
│   │   ├── UserProfileHeader
│   │   │   ├── UserProfileHeader.css
│   │   │   └── UserProfileHeader.jsx // (Recibe datos)
│   │   └── UserSettingMenu
│   │       ├── UserSettingMenu.css
│   │       └── UserSettingMenu.jsx
│   ├── RegisterForm
│   │   ├── RegisterForm.css
│   │   └── * RegisterForm.jsx
│   └── ResetPasswordForm
│       ├── ResetPasswordForm.css
│       └── * ResetPasswordForm.jsx
├── index.css
├── main.jsx
└── pages
    ├── CatalogPage
    │   ├── CatalogPage.css
    │   └── * CatalogPage.jsx // (Orquesta la carga de datos del catálogo)
    ├── DonationPage
    │   ├── DonationPage.css
    │   └── * DonationPage.jsx // (Orquesta la carga del historial de donaciones)
    ├── ForgotPasswordPage
    │   ├── ForgotPasswordPage.css
    │   └── ForgotPasswordPage.jsx
    ├── HomePage
    │   ├── HomePage.css
    │   └── * HomePage.jsx // (Si necesita cargar datos dinámicos)
    ├── LoginPage
    │   ├── LoginPage.css
    │   └── LoginPage.jsx
    ├── ProfilePage
    │   ├── ProfilePage.css
    │   └── * ProfilePage.jsx // (Orquesta la carga de todos los datos del perfil)
    ├── RegisterPage
    │   ├── RegisterPage.css
    │   └── RegisterPage.jsx
    └── ResetPasswordPage
        ├── ResetPasswordPage.css
        └── ResetPasswordPage.jsx
```