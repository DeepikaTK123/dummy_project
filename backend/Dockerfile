FROM python:3.12.1-slim

WORKDIR /app

# Copy only the requirements file first to leverage Docker's caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
