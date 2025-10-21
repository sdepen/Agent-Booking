export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Politique de confidentialité et de cookies
      </h1>

      <section className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Le site <strong>AgentBooking</strong> peut collecter des informations personnelles
          (nom, prénom, adresse e-mail, etc.) uniquement lorsque l’utilisateur remplit un
          formulaire de contact ou s’inscrit volontairement à une newsletter.
        </p>

        <h2 className="text-xl font-semibold mt-6">Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées uniquement pour répondre aux demandes de
          contact, gérer la relation client et, le cas échéant, envoyer des informations
          commerciales.
        </p>

        <h2 className="text-xl font-semibold mt-6">Partage des données</h2>
        <p>
          Aucune donnée personnelle n’est transmise à des tiers sans consentement explicite,
          sauf obligation légale.
        </p>

        <h2 className="text-xl font-semibold mt-6">Cookies</h2>
        <p>
          Le site peut utiliser des cookies afin d’améliorer l’expérience utilisateur et mesurer
          l’audience. L’utilisateur peut configurer son navigateur pour refuser les cookies.
        </p>

        <h2 className="text-xl font-semibold mt-6">Durée de conservation</h2>
        <p>
          Les données sont conservées pour une durée maximale de 3 ans à compter du dernier
          contact.
        </p>

        <h2 className="text-xl font-semibold mt-6">Droits des utilisateurs</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de
          suppression de vos données. Pour exercer vos droits, contactez :
        </p>

        <ul className="list-disc pl-6">
          <li>Email : <a href="mailto:contact@agentbooking.com" className="text-blue-600 underline">sachadepeweiller1@gmail.com</a></li>
          <li>Adresse postale : 17 bis route de Boussange, 57270 Richemont, France</li>
        </ul>
      </section>
    </main>
  );
}
