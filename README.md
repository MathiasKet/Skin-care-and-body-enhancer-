# Skin Care and Body Enhancer - E-commerce Website

A modern e-commerce platform for skin care and body enhancement products, built with React, TypeScript, Vite, and Supabase.

## 🚀 Deployment Instructions (Netlify)

### Prerequisites
- Netlify account
- Supabase project with database configured
- Node.js (v18 or higher)

### 1. Fork and Clone the Repository
```bash
git clone https://github.com/your-username/skincare-body-enhancer.git
cd skincare-body-enhancer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Deploy to Netlify
1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click on "Add new site" > "Import an existing project"
4. Connect to your Git provider and select the repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables from your `.env` file
7. Click "Deploy site"

### 5. Configure Domain (Optional)
1. Go to "Domain settings" in your Netlify dashboard
2. Click "Add custom domain" and follow the instructions

## 🛠 Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Environment Variables
See `.env.example` for required environment variables.

## 📦 Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- React Query
- Radix UI

## 📄 License
MIT
