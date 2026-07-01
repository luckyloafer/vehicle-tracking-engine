export class PresenceService {

    private readonly vehicles = new Map<
        string,
        number
    >();

    update(vehicleId: string) {

        this.vehicles.set(
            vehicleId,
            Date.now()
        );

    }

    isOnline(
        vehicleId: string
    ) {

        const lastSeen =
            this.vehicles.get(vehicleId);

        if (!lastSeen) {
            return false;
        }

        return (
            Date.now() - lastSeen
        ) < 15000;

    }

    getOfflineVehicles() {

        const offline: string[] = [];

        for (const [vehicleId, lastSeen] of this.vehicles) {

            if (Date.now() - lastSeen > 15000) {

                offline.push(vehicleId);

            }

        }

        return offline;

    }

}