![image](https://github.com/eranthaWELIKALA/Alternative-AWS-S3-Bucket/assets/33684206/3cf0dad3-a8ae-4112-9ce3-4e7930a94345)

## How to run with Docker
### Requirements
1. Docker

### Option 01
#### Steps
1. Clone the repository
2. Run the below docker commands
```
docker build -t <your-image-name> .
docker run -p 9000:9000 -v /path/to/host/volume:/usr/src/app/uploads <your-image-name>
```

### Option 02
1. Pull the image from the DockerHub and run it
```
docker run -p 9000:9000 -v /path/to/host/volume:/usr/src/app/uploads eranthawelikala/storage-service
```
