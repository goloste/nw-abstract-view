# Network Abstract View Visualizer
This project is meant to be integrated in a GUI to provide for a dynamic topology representation.
# Running
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run: 
### `npm start` Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Connecting to neo4j docker image
docker run -d \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j

which allows you to access neo4j through your browser at http://localhost:7474.

This binds two ports (7474 and 7687) for HTTP and Bolt access to the Neo4j API. A volume is bound to /data to allow the database to be persisted outside the container.

By default, this requires you to login with neo4j/neo4j and change the password. You can, for development purposes, disable authentication by passing --env=NEO4J_AUTH=none to docker run.