using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StarWarsApi.Server.Data;
using System.Net;
using System.Threading.Tasks;

namespace StarWarsApi.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StarshipsController : ControllerBase
    {
        private readonly StarWarsApiServerContext _context;

        public StarshipsController(StarWarsApiServerContext context)
        {
            _context = context;
        }

        // GET: /Starships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Starship>>> GetStarships()
        {
            return await _context.Starship.ToListAsync();
        }

        // GET: /Starships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Starship>> GetStarship(int id)
        {
            var starship = await _context.Starship.FindAsync(id);

            if (starship == null)
            {
                return NotFound();
            }

            return starship;
        }

        // POST: /Starships
        [HttpPost]
        public async Task<ActionResult<Starship>> CreateStarship(Starship starship)
        {
            _context.Starship.Add(starship);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStarship), new { id = starship.id }, starship);
        }

        // PUT: /Starships/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStarship(int id, Starship starship)
        {
            if (id != starship.id)
            {
                return BadRequest();
            }

            _context.Entry(starship).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StarshipExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /Starships/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStarship(int id)
        {
            var starship = await _context.Starship.FindAsync(id);
            if (starship == null)
            {
                return NotFound();
            }

            _context.Starship.Remove(starship);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StarshipExists(int id)
        {
            return _context.Starship.Any(e => e.id == id);
        }

        [HttpPost("refresh")]
        public async Task RefreshDataFromApi()
        {
            await _context.Starship.ExecuteDeleteAsync(); // clear out all existing data

            HttpClient httpClient = new HttpClient();
            var starshipsFromApi = await httpClient.GetFromJsonAsync<Starship[]>("https://swapi.info/api/starships");

            foreach (var starship in starshipsFromApi)
            {
                _context.Starship.Add(starship);
            }

            await _context.SaveChangesAsync();
        }
    }
}
