myApp.controller('helpController', function ($scope, $http) {
    $scope.config = {
        title: 'Hilfe',
        actions: [
            {title: 'Feedback geben', icon: 'thumbs_up_down', route: '/help-feedback-add'},
            {title: 'Frage stellen', icon: 'add', route: '/help-add'}
        ],
        content: 'content/help.html'
    }

    $scope.questions=[
        {question: 'Ihre Frage wird hier nicht beantwortet?', answer: "Falls Ihre Frage hier nicht beantwortet wird, können Sie eine Frage vorschlagen. Klicken Sie dazu bitte auf das Plus rechts oben. Beachten Sie: Die Beantwortung Ihrer Frage kann einige Tage dauern."},
        {question: 'Probleme beim Eintragen Ihrer Restaurantdaten?', answer: "Klicken Sie dazu auf <a href='#page'>Restaurantseite</a> und geben Sie wie gefordert Ihre Daten ein, danach klicken Sie auf das Häkchen."},
        {question: 'Probleme beim Ein- oder Ausloggen?', answer: 'Kontaktieren Sie bitte den Support: 06645613657.'},
        {question: 'Wie kann ich mein Passwort ändern?', answer: 'Gehen Sie dazu mit der Maus rechts oben über ihren Benutzernamen und klicken Sie dann auf <b>Einstellungen</b>. Klicken Sie anschließend auf <b>Passwort ändern</b>.'},
        {question: 'Wie kann ich Feedback akzeptieren oder ablehnen?', answer: "Unter <a href='#feedback'>Feedback</a> können Sie Ihr gesamtes Feedback einsehen. Akzeptieren oder ablehnen können Sie es, indem Sie den Mauszeiger zuerst auf das Feedback bewegen und dann eine der Optionen auswählen. Das Feedback wird anschließend einsortiert."}
        ]
});