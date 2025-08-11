using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StarWarsApi.Server;

namespace StarWarsApi.Server.Data
{
    public class StarWarsApiServerContext : DbContext
    {
        public StarWarsApiServerContext (DbContextOptions<StarWarsApiServerContext> options)
            : base(options)
        {
        }

        public DbSet<StarWarsApi.Server.Starship> Starship { get; set; } = default!;
    }
}
