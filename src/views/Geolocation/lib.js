import * as settings from "../../config/geolocation-settings";

export const geolocateAsync = async () => {
  return new Promise((resolve, reject) => {
    const geolocationUnavailable = !navigator.geolocation;
    if (geolocationUnavailable)
      return reject({ code: "UNSUPPORTED", UNSUPPORTED: "UNSUPPORTED" });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          lat: coords.latitude,
          lng: coords.longitude,
        }),
      (error) => {
        let message;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = settings.GEOLOCATION_ERROR_TEXT_DENIED;
            break;
          case error.POSITION_UNAVAILABLE:
            message = settings.GEOLOCATION_ERROR_TEXT_UNAVAILABLE;
            break;
          case error.TIMEOUT:
            message = settings.GEOLOCATION_ERROR_TEXT_TIMEOUT;
            break;
          default:
            message = settings.GEOLOCATION_ERROR_TEXT_UNKNOWN;
        }
        reject(message);
      },
      settings.GEOLOCATION_OPTIONS
    );
  });
};
