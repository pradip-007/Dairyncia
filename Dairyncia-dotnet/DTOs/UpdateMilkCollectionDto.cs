using Dairyncia.Enums;

namespace Dairyncia.DTOs
{
    public class UpdateMilkCollectionDto
    {
        public decimal Quantity { get; set; }
        public decimal FatPercentage { get; set; }
        public decimal SNF { get; set; }
        public decimal RatePerLiter { get; set; }

        public PaymentStatus PaymentStatus { get; set; }
    }
}
