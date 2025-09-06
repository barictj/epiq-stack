param (
    [string]$Message = "Auto commit"
)

git add . 
git commit - m $message
git push origin main