using Dairyncia.DTOs;
using Dairyncia.Models;
using Dairyncia.Enums; // ✅ Import enums
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Dairyncia.Controllers
{
    [ApiController]
    [Route("api/farmer")]
    [Authorize(Roles = "Farmer")]
    public class FarmerController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public FarmerController(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/farmer/profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found");

            var farmer = await _context.Farmers
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.UserId == userId);

            if (farmer == null)
                return NotFound("Farmer record not found");

            var response = new FarmerProfileDto
            {
                UserId = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                FarmerId = farmer.Id,
                AddressId = farmer.AddressId,
                CreatedAt = farmer.CreatedAt
            };

            return Ok(response);
        }

        // GET: api/farmer/milk-collections
        [HttpGet("milk-collections")]
        public async Task<IActionResult> GetMilkCollections()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User not authenticated");

            var farmer = await _context.Farmers
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.UserId == userId);

            if (farmer == null)
                return NotFound("Farmer record not found");

            var collections = await _context.MilkCollections
                .AsNoTracking()
                .Where(mc => mc.FarmerId == farmer.Id)
                .OrderByDescending(mc => mc.CreatedAt)
                .Select(mc => new MilkCollectionDto
                {
                    Id = mc.Id,
                    MilkType = ((MilkType)mc.MilkType).ToString(),        // ✅ Use enum
                    MilkShift = ((MilkShift)mc.MilkShift).ToString(),     // ✅ Use enum
                    Quantity = mc.Quantity,
                    FatPercentage = mc.FatPercentage,
                    SNF = mc.SNF,
                    RatePerLiter = mc.RatePerLiter,
                    TotalAmount = mc.TotalAmount,
                    PaymentStatus = ((PaymentStatus)mc.PaymentStatus).ToString(), // ✅ Use enum
                    CreatedAt = mc.CreatedAt
                })
                .ToListAsync();

            return Ok(collections);
        }
    }
}
