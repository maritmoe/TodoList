# TODO List with C#, .NET, and React

## Backend: TodoBackend

- Initial app made with command `dotnet new web -o TodoBackend -f net8.0`.
- Start backend with `dotnet run` in the `/TodoBackend` folder.

### Installations done to the backend

- Swagger added with `dotnet add package Swashbuckle.AspNetCore --version 6.5.0`.
- EF Core packages added with:
  - `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.0`
  - `dotnet tool install --global dotnet-ef`
  - `dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0`

## Frontend: TodoFrontend

- Initial React app made with Vite `npm create vite@latest TodoFrontend --template react`.
- Install dependencies with `npm install`.
- Start frontend with `npm run dev` in the `/TodoFrontend` folder.

### Frontend components and icons

- React components and icons installed from Material UI with command `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`.
