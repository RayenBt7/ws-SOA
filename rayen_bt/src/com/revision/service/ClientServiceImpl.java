package com.revision.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.revision.entities.Client;

public class ClientServiceImpl implements ClientService {

	EntityManagerFactory emf = Persistence.createEntityManagerFactory("revision");
	EntityManager em = emf.createEntityManager();

	@Override
	public Map<String, String> addClient(Client cl) {
		Map<String, String> result = new HashMap<>();
		try {
			if (!em.getTransaction().isActive())
				em.getTransaction().begin();
			em.persist(cl);
			em.getTransaction().commit();
			em.clear();
			result.put("Status", "OK");
		} catch (Exception e) {
			e.printStackTrace();
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			result.put("Status", "KO");
		}

		return result;
	}

	@Override
	public Client getClientById(Long clientId) {
		try {
			if (!em.getTransaction().isActive())
				em.getTransaction().begin();
			return em.find(Client.class, clientId);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Client> getAllClients() {
		try {
			Query query = em.createQuery("SELECT c FROM Client c");
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Client> searchClientsByName(String nom) {
		try {
			Query query = em.createQuery("SELECT c FROM Client c WHERE c.nom LIKE :nom");
			query.setParameter("nom", "%" + nom + "%");
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Map<String, String> updateClient(Client cl) {
		Map<String, String> result = new HashMap<>();
		try {
			if (!em.getTransaction().isActive())
				em.getTransaction().begin();
			em.merge(cl);
			em.getTransaction().commit();
			em.clear();
			result.put("Status", "OK");
		} catch (Exception e) {
			e.printStackTrace();
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			result.put("Status", "KO");
		}
		return result;
	}

	@Override
	public Map<String, String> deleteClient(Long clientId) {
		Map<String, String> result = new HashMap<>();
		try {
			if (!em.getTransaction().isActive())
				em.getTransaction().begin();
			Client client = em.find(Client.class, clientId);
			if (client != null) {
				em.remove(client);
				em.getTransaction().commit();
				em.clear();
				result.put("Status", "OK");
			} else {
				result.put("Status", "NOT_FOUND");
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			result.put("Status", "KO");
		}
		return result;
	}

}
