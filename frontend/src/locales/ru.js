export default {
  translation: {
    actions: {
      login: 'Войти',
      signUp: 'Зарегистрироваться',
      send: 'Отправить',
      rename: 'Переименовать',
      cancel: 'Отменить',
      remove: 'Удалить',
      logout: 'Выйти',
    },
    titles: {
      login: 'Войти',
      registration: 'Регистрация',
      channel: '# {{name}}',
      channels: 'Каналы',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      addChannel: 'Добавить канал',
      removeChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      notFound: 'Страница не найдена',
    },
    loginForm: {
      errors: {
        wrong: 'Неверные имя пользователя или пароль',
      },
    },
    signUpForm: {
      errors: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        mustMatch: 'Пароли должны совпадать',
        uniqueUser: 'Такой пользователь уже существует',
      },
    },
    renameChannelForm: {
      errors: {
        required: 'Обязательное поле',
        length: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
    },
    links: {
      home: 'Hexlet Chat',
      registration: 'Регистрация',
      toHome: 'на главную страницу',
    },
    placeholders: {
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      enterMessage: 'Введите сообщение...',
    },
    labels: {
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      channelName: 'Имя канала',
    },
    questions: {
      sure: 'Уверены?',
      noAccount: 'Нет аккаунта? ',
    },
    sentences: {
      canRedirect: 'Но вы можете перейти ',
    },
    signs: {
      hash: '#',
    },
  },
};
