package com.example.triplan.application.email.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Trie {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEnd;  // 끝 문자인지 여부
    }
    private TrieNode root;  // 트라이의 루트 노드

    public Trie() {
        root = new TrieNode();  // 루트 노드 초기화
    }

    // 이메일을 트라이에 삽입하는 메서드
    public void insert(String email) {
        TrieNode currentNode = root;
        // 이메일에 포함된 모든 문자를 차례대로 처리
        for (char c : email.toCharArray()) {
            currentNode = currentNode.children.computeIfAbsent(c, k -> new TrieNode());  // 자식 노드 추가
        }
        currentNode.isEnd = true;  // 끝 문자인지 표시
    }

    // 주어진 접두사로 이메일을 찾는 메서드
    public List<String> searchPrefix(String prefix) {
        TrieNode currentNode = root;  // 루트 노드부터 시작
        List<String> results = new ArrayList<>();  // 결과를 저장할 리스트

        // 접두사로 트라이 탐색
        for (char c : prefix.toCharArray()) {
            currentNode = currentNode.children.get(c);  // 자식 노드 탐색
            if (currentNode == null) {
                return results;  // 해당 접두사에 대한 결과가 없다면 빈 리스트 반환
            }
        }

        // 접두사 이후의 모든 이메일을 찾기
        findAllEmails(currentNode, prefix, results);
        return results;
    }

    // 현재 노드부터 시작해 모든 이메일을 찾는 메서드
    private void findAllEmails(TrieNode node, String prefix, List<String> results) {
        if (node.isEnd) {
            results.add(prefix);  // 끝 노드에 도달하면 해당 이메일 추가
        }

        // 자식 노드를 모두 탐색하면서 이메일을 완성
        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            findAllEmails(entry.getValue(), prefix + entry.getKey(), results);  // 자식 노드를 이어서 탐색
        }
    }

}
