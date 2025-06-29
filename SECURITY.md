# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within Yashavee Cloud Kitchen, please send an email to security@yashavee.com. All security vulnerabilities will be promptly addressed.

Please do not publicly disclose the issue until it has been addressed by our team.

## Security Measures

### Data Protection
- No sensitive customer data is stored in the application
- All API endpoints use proper validation
- Environment variables are used for configuration

### Authentication
- Secure session management implemented
- CORS protection enabled
- Input validation on all forms

### Dependencies
- Regular dependency updates
- Security audits with npm audit
- Only trusted packages used

## Best Practices

When contributing to this project:
- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP security guidelines