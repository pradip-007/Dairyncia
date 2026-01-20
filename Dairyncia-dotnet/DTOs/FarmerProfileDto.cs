namespace Dairyncia.DTOs
{
    public class FarmerProfileDto
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

        // Farmers
        public int FarmerId { get; set; }
        public int? AddressId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
