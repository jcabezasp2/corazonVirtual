using Microsoft.AspNetCore.SignalR;

namespace aspnetapp.Hubs
{
    public class SignalIR : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task SendMessageToUser(string user, string message)
        {
            await Clients.User(user).SendAsync("ReceiveMessage", user, message);
        }
    }
}