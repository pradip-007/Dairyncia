namespace Dairyncia.DTOs
{
    public class MilkCollectionDto
    {
        public int Id { get; set; }
        public string MilkType { get; set; }      
        public string MilkShift { get; set; }     
        public decimal Quantity { get; set; }
        public decimal FatPercentage { get; set; }
        public decimal SNF { get; set; }
        public decimal RatePerLiter { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentStatus { get; set; } 
        public DateTime CreatedAt { get; set; }
    }
}
