using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace aspnetapp.Models
{
    public class UserExtraData
    {
         public string Id { get; set; }
         public string Name { get; set; }

        public string Surname { get; set; }

        public string Photo { get; set; }

        public string UserId { get; set; }
        // public static implicit operator UserExtraData(EntityEntry<string?> v)
        // {
        //     throw new NotImplementedException();
        // }
    }
}