FROM mcr.microsoft.com/dotnet/sdk:7.0 
WORKDIR /back
COPY . .
CMD dotnet tool install --global dotnet-ef  &&\
echo 'export PATH="$PATH:/root/.dotnet/tools"' > ~/.bashrc && \   
&& source ~/.bashrc && \
dotnet ef database update && \
dotnet run
