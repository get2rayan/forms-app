const app=require('./app'); 

const port = process.env.PORT || 3030;  // Default to port 3030 if not specified in environment variables

app.listen(port, (err?: Error) => {
  if (err) {
      console.error("Error starting the server:", err);
      return;
  }   
  console.log(`Server app is running on http://localhost:${port}`);
});
