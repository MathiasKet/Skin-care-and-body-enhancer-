# Skin Care and Body Enhancer - E-commerce Website

A modern e-commerce platform for skin care and body enhancement products, built with React, TypeScript, Vite, and Supabase.

## 🚀 Deployment Instructions (Vercel)

### Prerequisites
- Vercel account
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

### 4. Deploy to Vercel
1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Log in to [Vercel](https://vercel.com/)
3. Click on "Add New" > "Project"
4. Import your Git repository
5. Vercel will automatically detect it's a Vercel project
6. Add your environment variables
7. Click "Deploy"

### 5. Configure Domain (Optional)
1. Go to your project in the Vercel dashboard
2. Navigate to "Domains"
3. Add your custom domain and follow the verification steps

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
