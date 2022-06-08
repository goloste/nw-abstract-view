# Network Abstract View Visualizer
This project is meant to be integrated in a GUI to provide for a dynamic topology representation.
# Running
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run: 
### `npm start` Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Run as Docker image
A Dockerfile is aviable to build and run the interface as a container.
To create the Docker image tagged as 'nw-abstract-view', just go to main directory and run :
```
docker build . -t nw-abstract-view
```
To run the image (in detached mode) redirecting to port XXXX use :
```
docker run -d -p XXXX:3000 -t nw-abstract-view
```