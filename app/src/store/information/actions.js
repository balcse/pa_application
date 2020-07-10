import client from 'api-information-client'

export function fetchInformation(state, data) {
  return client
    .fetchEvents()
    .then(information => {
      for (let i = 0; i < information.length; i++) {
        for (let j = 0; j < information[i].translations.length; j++) {
          information[i].translations[j].title = information[i].translations[j]['event'];
          delete information[i].translations[j].event;
        }
      }
      return state.commit('setInformation', information)
    })
}

export function saveNewInformationItem(state, data) {
  return client
    .saveNewEventItem(data)
}

export function addNewInformationItemTranslation(state, data) {
  data.event = data['title'];
  delete data.title;
  return client
    .addNewEventItemTranslation(data)
}

export function editInformationItem(state, data) {
  data.event = data['title'];
  delete data.title;
  return client
    .editEventItemTranslation(data)
}

export function deleteInformationItem(state, data) {
  return client
    .deleteEventItem(data)
}

export function updatePublishInformationItem(state, data) {
  return client
    .editEventItem(data)
}