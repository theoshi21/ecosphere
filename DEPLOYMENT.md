# Deployment Guide

## Vercel Deployment (Recommended)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/theoshi21/ecosphere)

### Manual Deployment Steps

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `theoshi21/ecosphere` from your repositories
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Environment Variables

Currently, the application doesn't require any environment variables as it uses sample data. For production with real data sources, you may need to add:

- `VITE_API_URL` - Backend API endpoint
- `VITE_API_KEY` - API authentication key
- Other service-specific variables

To add environment variables in Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables for Production, Preview, and Development

### Custom Domain

To add a custom domain:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your domain and follow DNS configuration instructions

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches and pull requests

## Alternative Deployment Options

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Note: You'll need to update `vite.config.ts` with the base path:
```typescript
export default defineConfig({
  base: '/ecosphere/',
  // ... other config
})
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t ecosphere .
docker run -p 80:80 ecosphere
```

## Build Optimization

The project is already optimized for production with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization
- ✅ Lazy loading for routes

## Performance Tips

1. **Enable Compression**: Most hosting providers enable gzip/brotli by default
2. **CDN**: Vercel and Netlify provide global CDN automatically
3. **Caching**: Static assets are cached with proper headers
4. **Analytics**: Add Vercel Analytics or Google Analytics if needed

## Monitoring

### Vercel Analytics

Add to your project:
```bash
npm install @vercel/analytics
```

In `src/main.tsx`:
```typescript
import { inject } from '@vercel/analytics';
inject();
```

### Error Tracking

Consider adding error tracking services:
- Sentry
- LogRocket
- Rollbar

## Troubleshooting

### Build Fails

1. Check Node.js version (requires 18+)
2. Clear cache: `rm -rf node_modules package-lock.json && npm install`
3. Check build logs for specific errors

### Routing Issues

If routes don't work after deployment, ensure:
- `vercel.json` includes the rewrite rule (already configured)
- For other hosts, configure SPA fallback to `index.html`

### Performance Issues

1. Check bundle size: `npm run build` shows gzipped sizes
2. Use Lighthouse for performance audit
3. Consider code splitting for large components

## Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify responsive design on mobile devices
- [ ] Check browser console for errors
- [ ] Test data visualizations render properly
- [ ] Verify navigation works smoothly
- [ ] Check loading performance
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up error monitoring (optional)

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- GitHub Issues: [github.com/theoshi21/ecosphere/issues](https://github.com/theoshi21/ecosphere/issues)
