Invoke-WebRequest -Uri http://localhost:3000/health-check -Method Get

$body = @{
    jobDescription = "job description for software role"
    resume = "resume text of a software developer"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/generate-cover-letter -Method Post -Body $body -ContentType "application/json"