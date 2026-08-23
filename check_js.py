from bs4 import BeautifulSoup
import subprocess

with open('app/app.html') as f:
    soup = BeautifulSoup(f, 'html.parser')

scripts = soup.find_all('script')
for i, script in enumerate(scripts):
    if script.string:
        with open(f'/tmp/script_{i}.js', 'w') as out:
            out.write(script.string)
        res = subprocess.run(['node', '-c', f'/tmp/script_{i}.js'], capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error in script {i}:\n{res.stderr}")
