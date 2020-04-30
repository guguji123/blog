from flask import jsonify
from app.api import bp

message = {'name': 'yao'}


@bp.route('/ping', methods=['GET'])
def ping():
    '''前端Vue.js用来测试与后端Flask API的连通性'''
    return jsonify(message)
