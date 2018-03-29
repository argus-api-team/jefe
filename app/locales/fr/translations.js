export default {
  application: {
    home: 'Tableau de bord',
    moreInfo: 'En savoir plus',
    noDate: 'Pas de date disponible.',
  },

  index: {
    header: 'Les possibilités de l\'API',
    subheader: 'présentation',
    search: {
      title: 'Recherche de véhicule',
      description: 'Rechercher un véhicule dans le Référentiel® Argus.',
    },
    referential: {
      title: 'Référentiel',
    },
    quote: {
      title: 'La Cote Argus',
      description: 'La Cote Argus® et les Valeurs Argus de marché.',
    },
    plate: {
      title: 'Chercher par immatriculation',
    },
    showroom: {
      title: 'Showroom',
      make: {
        title: 'Constructeur',
        change: 'Changer de constructeur',
      },
      models: {
        title: 'Modèles',
      },
      model: {
        title: 'Modèle',
        change: 'Changer de modèle',
        submodels: 'Variantes',
        submodel: {
          title: 'Variante',
          change: 'Changer de variante',
          generations: 'Générations',
          generation: {
            title: 'Génération',
            change: 'Changer de génération',
            phases: 'Phases',
            phase: {
              title: 'Phase',
              change: 'Changer de phase',
              versions: 'Versions',
              version: {
                title: 'Version',
                change: 'Changer de version',
                energy: 'Energie',
                gearbox: 'Boite de vitesse',
                periods: 'Périodes',
                period: {
                  title: 'Période',
                  change: 'Changer de période',
                  weight: 'Poids',
                  tyres: 'Pneus',
                  transmission: 'Transmission',
                  platform: 'Chassis',
                  performances: 'Performances',
                  consumption: 'Consommation',
                  dimensions: 'Dimensions',
                  boot: 'Coffre',
                  engine: 'Moteur',
                  feature: 'Options',
                  equipments: 'Equipements',
                },
              },
            },
          },
        },
      },
    },
  },

  login: {
    title: {
      signIn: 'Identifiez-vous',
    },
    form: {
      applicationId: 'Clé de l\'application',
      applicationSecret: 'Clé secrète de l\'application',
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
      isRemembered: 'Mémoriser ?',
    },
    button: {
      signIn: 'Me connecter',
    },
  },

  pageHeader: {
    myProfile: 'Mon Profil',
    signOut: 'Se déconnecter',
  },

  makeList: {
    title: 'Liste des constructeurs',
    displayDateSince: 'Depuis {{startDate}}',
    displayDateWithEnd: 'De {{startDate}} à {{endDate}}',
    noMatching: 'Aucun élément trouvé pour cette lettre.',
  },

  models: {
    base: {
      id: 'Identifiant Argus',
      name: 'Nom',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      positionQuote: 'Position quote',
      legacyId: 'Identifiant ID',
    },
  },
};
