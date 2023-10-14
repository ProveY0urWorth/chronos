import os
import subprocess

def create_virtual_environment(venv_dir):
    try:
        subprocess.run(["python", "-m", "venv", venv_dir], check=True)
    except subprocess.CalledProcessError:
        print("Error creating virtual environment.")
        exit(1)

def install_required_packages_in_virtual_env(venv_dir):
    packages_to_install = ["requests", "Django", "djangorestframework", "django-cors-headers"]

    if os.name == 'nt':  # Check if the OS is Windows
        python_executable = 'python.exe'
    else:
        python_executable = 'python'
    try:
        subprocess.run([os.path.join(venv_dir, 'Scripts' if os.name == 'nt' else 'bin', python_executable), "-m", "pip", "install"] + packages_to_install, check=True)
    except subprocess.CalledProcessError:
        print("Error installing required packages.")
        exit(1)

def activate_virtual_environment(venv_dir):
    if os.name == 'nt':
        activate_script = os.path.join(venv_dir, 'Scripts', 'activate')
    else:
        activate_script = os.path.join(venv_dir, 'bin', 'activate')
    
    try:
        subprocess.run([activate_script], shell=True, check=True)
    except subprocess.CalledProcessError:
        print("Error activating the virtual environment.")
        exit(1)

if __name__ == '__main__':
    venv_dir = '.venv'
    create_virtual_environment(venv_dir)
    install_required_packages_in_virtual_env(venv_dir)
    activate_virtual_environment(venv_dir)
