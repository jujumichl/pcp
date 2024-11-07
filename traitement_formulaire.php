<?php
// Définir l'adresse email de réception
$destinataire = "julienmichelin35@gmail.com";

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupérer et valider les données du formulaire
    $nom = trim(htmlspecialchars($_POST['nom']));
    $email = trim(htmlspecialchars($_POST['email']));
    $message = trim(htmlspecialchars($_POST['message']));

    // Initialiser les erreurs
    $erreurs = [];

    // Vérification des champs
    if (empty($nom)) {
        $erreurs[] = "Le nom est obligatoire.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erreurs[] = "Un email valide est requis.";
    }
    if (empty($message)) {
        $erreurs[] = "Le message ne peut pas être vide.";
    }

    // Si aucune erreur, on envoie le message
    if (empty($erreurs)) {
        $sujet = "Nouveau message de contact de $nom";
        $contenu = "Nom: $nom\n";
        $contenu .= "Email: $email\n";
        $contenu .= "Message:\n$message\n";

        // En-têtes de l'email
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Envoi de l'email
        if (mail($destinataire, $sujet, $contenu, $headers)) {
            echo "Merci, votre message a bien été envoyé.";
        } else {
            echo "Erreur lors de l'envoi de l'email. Veuillez réessayer.";
        }
    } else {
        // Afficher les erreurs
        foreach ($erreurs as $erreur) {
            echo "<p style='color: red;'>$erreur</p>";
        }
    }
}
?>
