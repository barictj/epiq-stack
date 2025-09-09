param (
    [string]$Message = "Auto commit"
)
cd C:\Users\baric\getting-started-todo-app
dir
git add .
git commit -m $message
git push origin main