from setuptools import setup, find_packages

setup(
    name="newreporter-backend",
    version="0.1.0",
    description="FastAPI backend for NEWREPORTER",
    packages=find_packages(where=".", include=["newreporter_backend", "newreporter_backend.*"]),
    include_package_data=True,
    install_requires=[
        "fastapi>=0.111.0",
        "uvicorn[standard]>=0.30.0",
        "python-dotenv>=1.0.1",
        "pydantic>=2.7.0",
        "requests>=2.32.0",
    ],
    python_requires=">=3.9",
)
