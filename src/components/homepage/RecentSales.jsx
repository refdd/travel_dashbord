import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ bookings = [] }) {
  // If no bookings data, show empty state
  if (!bookings || bookings.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center text-muted-foreground">
          <p>No recent bookings found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>{booking.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">
                {booking.customerName}
              </p>
              <p className="text-muted-foreground text-sm">
                {booking.customerEmail}
              </p>
              {booking.tourTitle && booking.tourTitle !== "N/A" && (
                <p className="text-muted-foreground text-xs">
                  Tour: {booking.tourTitle}
                </p>
              )}
            </div>
            <div className="font-medium">
              +{booking.currency === "USD" ? "$" : booking.currency}
              {booking.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
