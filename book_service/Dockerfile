FROM node:22.13.1-slim
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
#RUN apt-get update && \
#    apt-get install -y --no-install-recommends python3 python3-pip && \
#    rm -rf /var/lib/apt/lists/*
#RUN pip install --upgrade pip
#COPY requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt
RUN npm install
COPY . .
EXPOSE 5002
CMD ["npm", "books.js"]