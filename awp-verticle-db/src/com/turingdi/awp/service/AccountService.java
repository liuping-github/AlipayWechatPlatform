package com.turingdi.awp.service;

import com.turingdi.awp.db.AccountDao;
import com.turingdi.awp.entity.db.Account;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

import java.util.List;

public class AccountService {
	private AccountDao accDao;

	public AccountService(AccountDao accDao){
		this.accDao = accDao;
	}

	public List<Account> selectByUserId(int userId) {
		return accDao.selectByUserId(userId);
	}


	public void update(Account WxAccount, Handler<Integer> callback) {
		accDao.updateBase(WxAccount, callback);
	}

	/**
	 * 该方法用于从根据id获取微信公众号信息，通过调用dao层方法进行实现；
	 *
	 * @param id 公众号id
	 * @return 获取到的公众号数据
	 */
	public void getById(int id, Handler<JsonObject> callback) {
		accDao.getById(id, callback); // 调用dao层方法
	}

	public List<Account> listForPage(Account searchEntity){
		return accDao.listForPage(searchEntity);
	}

    public void login(String username, String password, Handler<JsonObject> callback) {
		Account account = new Account().setName(username).setPassword(password);
		accDao.login(account, callback);
    }

	public void loginById(long id, String password, Handler<JsonObject> callback) {
		Account account = new Account().setId(id).setPassword(password);
		accDao.loginById(account, callback);
	}

	public void getAccountList(Handler<List<JsonObject>> callback){
		accDao.getAccountList(callback);
	}

	public void updateWxPay(Account acc, Handler<Integer> callback){
		accDao.updateWxPay(acc, callback);
	}

	public void updateZfbPay(Account acc, Handler<Integer> callback){
		accDao.updateZfbPay(acc, callback);
	}
}