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

    getVehicles() {

        return this.vehicles;

    }

}