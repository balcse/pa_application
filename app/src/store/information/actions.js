import client from 'api-information-client'

export function fetchInformation(state, data) {
  return client
    .fetchInformation()
    .then((information) => state.commit('setInformation', information))
}

export function saveNewInformationItem(state, data) {
  return client
    .saveNewInformationItem(data)
}

export function addNewInformationItemTranslation(state, data) {
  data.information = data.title
  delete data.title
  return client
    .addNewInformationItemTranslation(data)
}

export function editInformationItem(state, data) {
  return client.editInformationItem(data)
}

export function editInformationItemTranslation(state, data) {
  data.information = data.title
  delete data.title
  return client
    .editInformationItemTranslation(data)
}

export function deleteInformationItem(state, data) {
  return client
    .deleteInformationItem(data)
}

export function updatePublishInformationItem(state, data) {
  return client
    .editInformationItem(data)
}

export function setTopics(state, data) {
  return client.setTopics(data)
}

export function setUserTypes(state, data) {
  return client.setUserTypes(data)
}

export function deleteTopics(state, id) {
  return client.deleteTopics(id)
}

export function deleteUserTypes(state, id) {
  return client.deleteUserTypes(id)
}

export function fetchInformationTopics(state, id) {
  return client
    .fetchInformationTopics(id)
    .then((informationTopics) => informationTopics)
}

export function fetchInformationUserTypes(state, id) {
  return client
    .fetchInformationUserTypes(id)
    .then((informationUserTypes) => informationUserTypes)
}

export function fetchAllInformationTopics(state) {
  return client
    .fetchAllInformationTopics()
    .then((informationTopics) => informationTopics)
}

export function fetchAllInformationUserTypes(state) {
  return client
    .fetchAllInformationUserTypes()
    .then((informationUserTypes) => informationUserTypes)
}

export function updatePublished(state, data) {
  return client
    .updatePublished(data.id, data.published)
    .then(() => {
      state.commit("updatePublished", data)
    })
}

export function deleteProdTranslations(state, id) {
  return client.deleteProdTranslations(id)
}

export function addNewInformationItemTranslationProd(state, data) {
  data.information = data.title
  delete data.title
  return client
    .addNewInformationItemTranslationProd(data)
}