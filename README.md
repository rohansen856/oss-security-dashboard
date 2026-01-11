# Security Dashboard UI

A Next.js application that displays security analysis for open source packages using the SafeDep API.

## Features

- 🔍 Search and analyze open source packages from multiple ecosystems (npm, PyPI, Maven, Go, etc.)
- 🛡️ View security vulnerabilities with severity ratings
- 📊 OpenSSF Scorecard metrics
- 🔒 Malicious package analysis
- 📜 License information
- 🎨 Beautiful, responsive UI built with shadcn/ui

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: SafeDep Insights & Malysis APIs

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. SafeDep API credentials (API Key and Tenant ID)

### Get SafeDep API Credentials

1. Sign up for a free account at [app.safedep.io](https://app.safedep.io)
2. Go to Settings > API Keys to get your:
   - API Key (format: `sfd_...`)
   - Tenant ID (format: `<team>-<org>.safedep.io`)

Alternatively, use [vet CLI](https://github.com/safedep/vet):

```bash
vet cloud quickstart
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rohansen856/oss-security-dashboard
cd oss-security-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
SAFEDEP_API_KEY="your_api_key_here"
SAFEDEP_TENANT_ID="your_tenant_id_here"

# Optional: Force use of mock data even if credentials are provided
# USE_MOCK_DATA="true"
```

**Note:** The application will automatically use mock data if API credentials are not configured or if the API is unreachable. This allows you to run and test the application immediately.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Analyze a Package

1. Visit the homepage at `http://localhost:3000`
2. Select the ecosystem (npm, PyPI, Maven, etc.)
3. Enter the package name
4. Enter the version
5. Click "Analyze Package"

### Direct URL Access

You can also directly access package analysis using the URL format:

```
http://localhost:3000/p/{ecosystem}/{name}/{version}
```

Examples:

- `http://localhost:3000/p/npm/next/15.0.0`
- `http://localhost:3000/p/pypi/requests/2.31.0`
- `http://localhost:3000/p/maven/com.fasterxml.jackson.core:jackson-databind/2.15.0`

## API Integration

This application uses Next.js API routes to securely proxy requests to the SafeDep API. The API key is never exposed to the client.

### API Routes

- `GET /api/package/[ecosystem]/[name]/[version]` - Fetches package analysis data

The API route handles:

1. Authentication with SafeDep API using server-side credentials
2. Parallel fetching of Insights and Malysis data
3. Error handling and graceful degradation
4. Structured response formatting

## Important Notes

### Data Availability

Not all packages have analysis data available. The application handles this gracefully by:

- Displaying appropriate error messages
- Showing empty states when no data is available
- Continuing to display available data even if some API calls fail

## Environment Variables

| Variable            | Description            | Required |
| ------------------- | ---------------------- | -------- |
| `SAFEDEP_API_KEY`   | Your SafeDep API key   | Yes      |
| `SAFEDEP_TENANT_ID` | Your SafeDep tenant ID | Yes      |

## Development

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Troubleshooting

### API Connection Issues

If you're getting "ENOTFOUND api.safedep.io" errors:

1. Check your internet connection
2. Verify your API credentials are correct
3. The SafeDep API uses gRPC - you may need to implement the gRPC client instead of REST fetch
4. Contact SafeDep support at jobs@safedep.io with subject "[SafeDep API Issue]"

### No Data Available

If analysis shows "No data available":

- The package may not have been analyzed yet
- Try a more popular package (e.g., npm/react, npm/express)
- Check if the package name and version are correct

## Resources

- [SafeDep Documentation](https://docs.safedep.io/)
- [SafeDep GitHub](https://github.com/safedep)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## Support

For issues with:

- **SafeDep API**: Email jobs@safedep.io with subject "[SafeDep API Issue]"
- **This Application**: Open an issue on GitHub

## License

MIT
