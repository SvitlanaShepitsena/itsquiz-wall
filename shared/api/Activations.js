import Base from './Base';

export default class ActivationsAPI extends Base {
    list(params) {
        return this.apiClient.get(`https://chicagowepapp.firebaseio.com/articles.json`, {}, params );
    }

    show(id, params) {
        return this.apiClient.get(`quizwall/activations/${id}`, {}, params);
    }
}
