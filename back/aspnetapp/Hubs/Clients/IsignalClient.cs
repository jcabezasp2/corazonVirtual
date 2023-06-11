using System.Threading.Tasks;
using signal.Models;

namespace signal.Hubs.Clients
{
    public interface IsignalClient
    {
        Task ReceiveMessage(Message message);
    }
}