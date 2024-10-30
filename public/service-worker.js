self.addEventListener("push", (event) => {
  console.log(event);
  const options = event.data.json().options;
  const title = event.data.json().title;
  event.waitUntil(self.registration.showNotification(title, options));
});
